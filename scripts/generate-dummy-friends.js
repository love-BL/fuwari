import fs from 'fs';
import path from 'path';

const targetDir = path.join('src', 'content', 'friends');

// Ensure directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Luna",
    "https://api.dicebear.com/7.x/identicon/svg?seed=Random",
    "https://api.dicebear.com/7.x/micah/svg?seed=Denny"
];

for (let i = 1; i <= 20; i++) {
    const num = i.toString().padStart(3, '0');
    const fileName = `099-dummy-${num}.json`;
    const filePath = path.join(targetDir, fileName);

    const data = {
        name: `测试友链 ${num}`,
        avatar: avatars[i % avatars.length],
        introduction: `这是一个测试用的友链描述信息，编号 ${num}。用于测试页面布局效果。`,
        url: `https://example.com/friend-${num}`
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Created ${fileName}`);
}
