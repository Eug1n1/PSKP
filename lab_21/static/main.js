window.addEventListener('load', () => {
    if (window.location.href.match(/\/add|update/)) {
        const inputs = document.querySelectorAll('.contact_btn')
        inputs.forEach((e) => {
            e.disabled = true
        })
    }

    const delete_btn = document.querySelector('#delete_btn')

    document.querySelector('#name').addEventListener('input', () => {
        delete_btn.disabled = true
    })
    document.querySelector('#phone').addEventListener('input', () => {
        delete_btn.disabled = true
    })
})
