const butInstall = document.getElementById('buttonInstall');

let installPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
});

butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Response: ${result.outcome}`);

    disableInAppInstall();
});

window.addEventListener('appinstalled', (event) => {
    disableInAppInstall();
});

function disableInAppInstall() {
    installPrompt = null;
    butInstall.setAttribute("hidden", "")
}