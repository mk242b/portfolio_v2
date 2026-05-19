import fs from 'fs';
import https from 'https';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const files = [
  { url: 'https://i.ibb.co/9k3Mq7n3/kmp-mugshot.jpg', name: 'profile.jpg' },
  { url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXhmaHVueXNmbXR5eXhxa2xucjU3d3c4cjV1eW55cXZweDl1ZHNuZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c7mso33ESjbSfI3RDC/giphy.gif', name: 'silent-reverie.gif' },
  { url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG11cTVranV5b3N5bGE1d3MwZXI2bDRycDU5bDgzbWJ0c2R5bWk1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nrOOXmVMZjrFz3wp2a/giphy.gif', name: 'nobody-knows.gif' },
  { url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWMydjd4Ymt2d2p3cG5zNDU3anYzMGt6NGpkNzMxdWxwaHVnem5kMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r24qMSLM4gLZ6xqM0f/giphy.gif', name: 'terrashell.gif' },
  { url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmUzamtibzh6dmJvamNhdzZ4dW4yOXJtcm11cjEwOGt4dmpjeHZnYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G0Mz3b670R4TxZn2II/giphy.gif', name: 'diving-deeper.gif' },
  { url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamMzZmU2Z3EyMzQzemYxNDBrOWVrZ3QxMzY0dzczM3Jyd2RwbGphcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fEKjlUGkIqxrIfWYqu/giphy.gif', name: 'chaos-2-run.gif' }
];

async function download() {
  for (const {url, name} of files) {
    await new Promise((resolve) => {
       const file = fs.createWriteStream(path.join(assetsDir, name));
       https.get(url, (response) => {
         response.pipe(file);
         file.on('finish', () => {
           file.close(resolve);
         });
       });
    });
  }
}

download();
