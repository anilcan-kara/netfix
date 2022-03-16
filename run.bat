cd ~/netfix
pm2 delete netfix && pm2 start ./index.js --name=netfix || pm2 start ./index.js --name=netfix
pm2 save