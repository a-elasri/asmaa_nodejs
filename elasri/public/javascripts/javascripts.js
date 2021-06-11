let currentPage = 1
let limit = 7
let nbElements

$("#updateBtn").hide()
function showPaginatedUsers(){
    fetch(`http://localhost:3000/users?page=${currentPage}&limit=${limit}`,{headers:headers()})
       .then(handleErrors)
        .then(data => {
            $("#usesData").html("");
            usersData = getPagingData(data,currentPage,limit);
            nbElements = usersData.totalItems
            updateButtons()
            usersData.users.forEach(element => {
                createRow(element.id,element.username,element.email,element.password,element.role).appendTo("#usesData")
           });
        })
}

function showMsg(msg,type){
    $("#pageCard").append($("<div>").addClass(`alert alert-${type} m-3`).text(msg))
}

function showNextPaginatedUsers(){
    if((currentPage)*limit < nbElements){
        currentPage++
        showPaginatedUsers()
    }
}

function showPrevPaginatedUsers(){
    if((currentPage) > 1){
        currentPage--
        showPaginatedUsers()
    }
}

const createRow = (id,username,email,password,role) =>{
    return $("<tr/>").append(`<td>${id}</td><td>${username}</td><td>${email}</td><td>${role}</td>`)
                            .append($("<td/>").append($("<button/>").addClass("btn btn-outline-success").append($("<span/>").addClass("fa fa-pencil"))
                            .click(()=>{intiEdit(id,username,email,password,role)}))
                            .append($("<button/>").addClass("btn btn-outline-danger").append($("<span/>").addClass("fa fa-trash")).click(()=>{
                                deleteUser(id)
                            })))
}

function updateButtons(){
    if((currentPage+1)*limit>=(nbElements+limit)){
        $("#nextUser").hide()
    }else{
        $("#nextUser").show()
    }
    if(currentPage == 1){
        $("#previousUser").hide()
    }else{
        $("#previousUser").show()
    }
}

function deleteUser(id){
    clearMsgs()
    fetch(`http://localhost:3000/users/${id}`,{method:"DELETE",headers:headers()})
    .then(handleErrors)
    .then(() => {
            showPaginatedUsers()
            showMsg(`User with id = ${id} deleted successfully!`,"success")
    })
}

const formData = () =>{
    const username = $("#username").val()
    const email = $("#email").val()
    const password = $("#password").val()
    const role = $("#role").val()
    return {username,email,password,role}
}

function updateUser(event){
    event.preventDefault()
    clearMsgs()
    const user = formData()
    const id = $("#userId").val()
    Object.assign(user,{id:id})
    fetch(`http://localhost:3000/users/`,
    {method:"PUT",
    body:JSON.stringify(user),
    headers:headers()})
                    .then(handleErrors)
                    .then(() => {
                            refreshForm()
                            showPaginatedUsers()
                            showMsg(`User with id = ${id} updated successfully!`,"success")
                    })
}
function addUser(event){
    event.preventDefault()
    clearMsgs()
    const user = formData()
    fetch(`http://localhost:3000/users/`,
    {method:"POST",
    body:JSON.stringify(user),
    headers:headers()}).then(handleErrors)
                    .then(() => {
                            refreshForm()
                            showPaginatedUsers()
                            showMsg(`User created successfully!`,"success")
                    })
}
function intiEdit(id,username,email,password,role){
        $("#username").val(username)
        $("#email").val(email)
        $("#pwd").val(password)
        $("#userId").val(id)
        $('#role option')
        .removeAttr('selected')
        .filter(`[value=${role}]`)
         .attr('selected', true)
         $("#addBtn").hide()
         $("#updateBtn").show()
        $("#formTitle").text("Update user")
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: users } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, users, totalPages, currentPage };
  };

function refreshForm(){
    $("#username").val("")
    $("#email").val("")
    $("#pwd").val("")
    $('#role option')
    .removeAttr('selected')
        .filter(`[value=admin]`)
         .attr('selected', true)
         $("#addBtn").show()
         $("#updateBtn").hide()
        $("#formTitle").text("Add user")
}

function handleErrors(response){
    if(!response.ok){
        console.log(response.body);
        response.text().then(err=>{
            showMsg(JSON.parse(err).message,"danger")
        })
       }
       return response.json()
}

const headers = () =>{
    return {"Content-Type" : "application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJlYmVjYV9HcmVlbmZlbGRlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMjAwNzU2NSwiZXhwIjoxNjIyNjEyMzY1fQ.3TfHr5RPz2Uz6xy57BPx8xO8_JkcWw7q-ZT8mKBQO8I"}
}
function clearMsgs(){
    $("#pageCard").html("")
}