const fs = require("fs");
const filePath = "src/Constants.js";
let text = fs.readFileSync(filePath, "utf8");
const mapping = {
  ข้าวคลุกกะปิ: "/images/ข้าวคลุกกะปิ.jpg",
  แกงมัสมั่นไก่: "/images/แกงมัสมั่นไก่.jpg",
  แกงส้มชะอมกุ้ง: "/images/แกงส้มชะอมกุ้ง.jpg",
  ข้าวผัดปู: "/images/ข้าวผัดปู.jpg",
  ผัดซีอิ๊ว: "/images/ผัดซีอิ๊ว.jpg",
  ผัดกะเพราเนื้อ: "/images/ผัดกะเพราเนื้อ.jpg",
  ยำวุ้นเส้น: "/images/ยำวุ้นเส้น.jpg",
  ข้าวหมูแดง: "/images/ข้าวหมูแดง.jpg",
  ไก่ทอดหาดใหญ่: "/images/ไก่ทอดหาดใหญ่.jpg",
  ข้าวเหนียวหมูปิ้ง: "/images/ข้าวเหนียวหมูปิ้ง.jpg",
  ส้มตำปูปลาร้า: "/images/ส้มตำปูปลาร้า.webp",
  แกงเผ็ดหมู: "/images/แกงเผ็ดหมู.jpg",
  ข้าวต้มกุ้ง: "/images/ข้าวต้มกุ้ง.jpg",
  บัวลอยเผือก: "/images/บัวลอยเผือก.jpg",
  ต้มยำปลากระพง: "/images/ต้มยำปลากระพง.avif",
  ขนมครก: "/images/ขนมครก.webp",
  ทับทิมกรอบ: "/images/ทับทิมกรอบ.png",
  แกงจืดหมูสับ: "/images/แกงจืดหมูสับ.avif",
  ข้าวหน้าปลาไหล: "/images/ข้าวหน้าปลาไหล.jpg",
  ลาบปลาช่อน: "/images/ลาบปลาช่อน.jpg",
};
let replaced = 0;
for (const [name, img] of Object.entries(mapping)) {
  const regex = new RegExp(
    `(name:\s*"${name}",[\s\S]*?image:\s*)("|')([^"']*)("|')`,
    "m",
  );
  const match = text.match(regex);
  if (!match) {
    console.error("No match for", name);
    continue;
  }
  text = text.replace(regex, match[1] + match[2] + img + match[4]);
  replaced += 1;
}
fs.writeFileSync(filePath, text, "utf8");
console.log("replaced", replaced);
