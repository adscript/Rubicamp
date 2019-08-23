import MesinHitung from './MesinHitung';
const Pi = 22/7;
let mh = new MesinHitung();
mh.add(10).subtract(5).result(); //1 + 10 - 5 = 6
mh.add(3).multiply(4).divide(6).result(); //6 + 3 * 4 / 6 = 6
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`);
mh.multiply(2).multiply(Pi).result(); //keliling lingkaran dg jari jari 7 => 44
mh.x = 7;
mh.square().multiply(Pi).result();
mh.x = 4;
mh.exponent(3).result();
mh.squareRoot().result();
