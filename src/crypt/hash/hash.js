const toHex = (p, v) => v.toString(16).padStart(p, "0");

const hash = (hashBlock, H) => (input) => {
  const data = Buffer.from(input, "utf8");
  let h = [...H];
  let i;
  for (i = 0; i < data.length - 64; i = i + 64) {
    h = hashBlock(h, data.slice(i, i + 64));
  }
  // 512bitになるようにパディング
  const lRemain = data.length - i;

  // 余りデータを一時配列へコピー
  const tmp = Buffer.concat([
    data.slice(i, i + lRemain),
    new Buffer(64 - lRemain),
  ]);
  tmp[lRemain] = 0x80;
  if (lRemain > 64 - 8 - 1) {
    // 余りデータが56バイト以上存在する場合
    // もうひとブロック追加する
    // -> 最後の8バイトはデータ長を格納するので
    tmp.fill(0x00, lRemain + 1, 64);
    h = hashBlock(h, tmp);
    tmp.fill(0x00, 0, 64 - 8);
  } else {
    tmp.fill(0x00, lRemain + 1, 64 - 8);
  }

  // 元データ長を8バイトで表現でデータ末尾へ追加
  const lenU = Math.floor((data.length * 8) / Math.pow(2, 32)); // 上位1バイト
  const lenL = (data.length * 8) & 0xffffffff; // 下位1バイト
  tmp.writeUInt32BE(lenU, 56);
  tmp.writeUInt32BE(lenL, 60);

  h = hashBlock(h, tmp);
  return h.reduce((acc, v) => acc + toHex(8, v), "");
};

export default hash;
