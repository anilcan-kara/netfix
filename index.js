const getWindowsProxy = require('@cypress/get-windows-proxy');
const regedit = require('./node_modules/registry-js/build/Release/registry.node');

process.env.TZ = 'Europe/Istanbul';

const HKCU = 0x80000001; // HKEY_CURRENT_USER
const day = 60 * 60 * 24; // 1 day
const restartTime = (7 - 3) * 3600 + 45 * 60; // 07:45:00

setInterval(async function () {
  const proxyEnable = (
    await regedit.readValues(
      HKCU,
      'Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'
    )
  ).find((x) => x?.name === 'ProxyEnable');

  if (proxyEnable?.data === 1)
    console.log(
      new Date().toLocaleString(),
      'regedit.setValue: ',
      regedit.setValue(
        HKCU,
        'Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings',
        'ProxyEnable',
        'REG_DWORD',
        '0'
      )
    );
  if (parseInt((+new Date() / 1000) % day, 10) === restartTime) process.exit(0);
}, 1000);
