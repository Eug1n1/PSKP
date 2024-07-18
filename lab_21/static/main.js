window.addEventListener('load', () => {
    const delete_btn = document.querySelector('#delete_btn')

    document.querySelector('#name').addEventListener('input', () => {
        delete_btn.disabled = true
    })
    document.querySelector('#phone').addEventListener('input', () => {
        delete_btn.disabled = true
    })
})
