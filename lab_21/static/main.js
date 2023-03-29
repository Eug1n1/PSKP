window.addEventListener('load', () => {
    if (window.location.href.match(/\/add|update/)) {
        const inputs = document.querySelectorAll('.contact_btn')
        inputs.forEach(e => {
            e.disabled = true
        })
    }
})
