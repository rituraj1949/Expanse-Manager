document.addEventListener('DOMContentLoaded', reload)
const mainUrl = "https://crudcrud.com/api/5957a90a90f444c89851f02c9f4e78ee/Expenses"
async function reload(e)
{   

    let displayData= await axios.get(mainUrl)

            for(let i=0; i<displayData.data.length; i++)
            {
                showOutput(displayData.data[i])
            }

    
}

let getCallBtn = document.getElementById('submitButton')
getCallBtn.addEventListener('click', postUserData)
function postUserData(event01)
{   
    console.log('Button is working')
    let amount = document.getElementById('amount').value
    let description = document.getElementById('description').value              
    let category = document.getElementById('category').value
    let userObj = {"Amount": amount, "Description":description,"Category":category}
    function addUserToCrudCrud()
    {
        axios.post(mainUrl, userObj)
    }
    addUserToCrudCrud()
    showOutput(userObj)

}

function showOutput(obj)
{
    
    let mainClass = document.getElementById('mainList')
    let childClass = document.createElement('li')
    childClass.textContent = `${obj.Amount} - ${obj.Description} - ${obj.Category}`
    mainClass.append(childClass)
    let editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.style.backgroundColor = 'green'
    childClass.appendChild(editBtn)
    let delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.style.backgroundColor = 'red'
    childClass.appendChild(delBtn)
    delBtn.addEventListener('click', async()=>
    {
        if(confirm('Delete Expense?'))
            {
                let deleteObj = await axios.get(mainUrl)
                let results = [];

                let toSearch = obj.Description;

                for(var i=0; i<deleteObj.data.length; i++) {
                for(key in deleteObj.data[i]) {
                    if(deleteObj.data[i][key].indexOf(toSearch)!=-1) {
                    results.push(deleteObj.data[i]);
                    }
                }
                }
                let delId = results[0]._id
                console.log(delId)
                let delUrl = `https://crudcrud.com/api/5957a90a90f444c89851f02c9f4e78ee/Expenses/${delId}`
                console.log(delUrl)
                axios.delete(delUrl)
                mainClass.removeChild(childClass)
                
                
            }
             }
             )
    editBtn.addEventListener('click', async()=>
    {   
        let newAmount = prompt('Add Amount', 'Amount Here')
        let newDescrition = prompt('Add Description', 'Description Here')
        let newCategory = prompt('Add Category','Category Here')
        childClass.textContent = `${newAmount} - ${newDescrition} - ${newCategory}`          
        let obj01 = {"Amount": newAmount, "Description":newDescrition,"Category":newCategory}
        childClass.append(delBtn)
        childClass.appendChild(editBtn)
        let editObj = await axios.get(mainUrl)
        let results = [];
        let toSearch = obj.Description;
        for(let i=0; i<editObj.data.length; i++) 
        {
            for(key in editObj.data[i]) 
            {
                if(editObj.data[i][key].indexOf(toSearch)!=-1) 
                {
                    results.push(editObj.data[i]);
                }
            }
        }
        let editId = results[0]._id
        console.log(editId)
        let editUrl = `https://crudcrud.com/api/5957a90a90f444c89851f02c9f4e78ee/Expenses/${editId}`
        console.log(editUrl)
        axios.put(editUrl, obj01)
 

                  
            
            

    })
}