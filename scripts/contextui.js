const topContextWrapper = document.getElementById('topContextWrapper');
const topContextLabel = document.getElementById('topContextLabel');

window.broadcastTopContextMessage = function(message, time) {
    topContextWrapper.classList.add('show')
    topContextLabel.textContent = message
    setTimeout(() => {
        topContextWrapper.classList.remove('show')
    }, time)
}