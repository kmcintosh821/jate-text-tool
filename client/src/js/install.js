const butInstall = document.getElementById('buttonInstall');

let installPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Response: ${result.outcome}`);

    disableInAppInstall();
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    disableInAppInstall();
});

function disableInAppInstall() {
    installPrompt = null;
    butInstall.setAttribute("hidden", "")
}