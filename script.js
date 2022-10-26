//할일 추가부터 넣기
//1. 유저가 할일을 입력한 후 + 버튼을 클릭하면 task에 추가된다.
//2. check버튼을 누르면 task가 밑줄이 쳐지면서 완료표시가 뜨고 delete버튼을 누르면 task가 삭제된다.

let inputTask=document.getElementById("input-area")
let addButton=document.getElementById("add-button")
let taskList=[]
let tabs=document.querySelectorAll(".menu-bar div")
let mode="all"
let filterList=[]
let underline=document.getElementById("underline")

inputTask.addEventListener("keyup",function(event){
    if(event.keyCode===13){
        addTask(event)
    }
})

tabs.forEach((menu) =>menu.addEventListener("click",(e)=>underlineIndicator(e)))


function underlineIndicator(e){
    underline.style.left=e.currentTarget.offsetLeft+"px";
    underline.style.width=e.currentTarget.offsetWidth+"px";
}
addButton.addEventListener("click", addTask)

for(i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs)

tabs.forEach(function deleteTask(id){})



function addTask(){
    let task={
        id: randomIDGenerate(),
        inputValue: inputTask.value,
        isComplete: false
    }
    taskList.push(task)
    console.log("할일추가", taskList)
    render()
}

function render(){
    let list=[]
    if(mode=="all"){
        list=taskList
    }else if(mode=="ongoing"||mode=="done"){
        list=filterList
    }

    let resultHTML=''
    for(i=0; i<list.length; i++){
        if(list[i].isComplete==true){
            resultHTML+=`<div class="task-bar">
        <div class="true-line task-text">${list[i].inputValue}</div>
        <div>
            <button onclick="check('${list[i].id}')">CHECK</button>
            <button onclick="deleteTask('${list[i].id}')">DELETE</button>
        </div>
    </div>`
        }else{
            resultHTML+=`<div class="task-bar">
            <div class="task-text">${list[i].inputValue}</div>
            <div>
                <button onclick="check('${list[i].id}')">CHECK</button>
                <button onclick="deleteTask('${list[i].id}')">DELETE</button>
            </div>
        </div>`
        }
    }

    document.getElementById("task-board").innerHTML=resultHTML
}


function check(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete=!taskList[i].isComplete
            break;
        }
    }
    render()
}

function deleteTask(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i, 1)
            break;
        }
    }
    render()
}



function randomIDGenerate(){
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


function filter(event){
    mode=event.target.id
    filterList=[]
    if(mode=="all"){
        render()
    }else if(mode=="done"){
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode=="ongoing"){
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}