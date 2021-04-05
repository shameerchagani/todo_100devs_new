let deleteBtn = document.querySelectorAll('.btn-delete');
let tasks = document.querySelectorAll('.tasks button');

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteTaskItem)
})

    async function deleteTaskItem() {
        const itemText = await this.parentNode.innerText
        try {
            const response = await fetch('/deleteTaskItem', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'delTask': itemText
                })
                
            })
            const data = await response.json()
            console.log(data)
            console.log(itemText)
            // location.reload()

        } catch (err) {
            console.log(err)
        }
    }
