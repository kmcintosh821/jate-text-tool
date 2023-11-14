const butInstall = document.getElementById('buttonInstall');

let installPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
});

butInstall.addEventListener('click', async () => {
    if (installPrompt)
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    
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