let currentPage = 1;
let hadAchoose = false;
function selectFormRecords(records, Form){
  /*
    if(){
    renderRecord()
    }
    */
   return
}
let screenWidth = screen.width;

function showBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url, 'GET', function() {
       showRecord(this.response);        
    })
    }
    function  showRecord(record){
    let row;
    let col1;
    let col2;
    let modal = document.getElementById('modalInfoBody');
    modal.innerHTML='';
    document.getElementById('showModalLabel').innerHTML=record.name;
    for (key in record){
    if (record[key]!= null && record[key]!= "null"){
    row = document.createElement('div');
    row.classList.add('row');
    col1 = document.createElement('div');
    col1.classList.add('col-sm-6');
    col1.classList.add('mb-3');
    col1.classList.add('font-weight-bold');
    col1.innerHTML=`${key} :`;
    row.append(col1);
    col2 = document.createElement('div');
    col2.classList.add('col-sm-6');
    col2.classList.add('mb-3');
    col2.classList.add('font-italic');
    col2.innerHTML=record[key];
    row.append(col2);
    modal.append(row);
    }
}
}
function editRecord(selectRecord){



   for (let prop in selectRecord) {
       //alert(prop + "=" + selectRecord[prop]);
     
      if (prop=="id" || prop=="created_at" || prop=="updated_at" || prop=="socialDiscount"|| prop=="isNetObject"|| prop=="socialPrivileges" || prop=="rate" || prop=="student_id"){
        continue;
      } else {
        let temp = document.getElementById(`${prop}`);
        temp.value= selectRecord[prop];
      }
      if (selectRecord.isNetObject==1){
        let isNetObject = document.getElementById('isNetTrue');
        isNetObject.checked= true;
      }  else if (selectRecord.isNetObject==0) {      
        let isNetObject = document.getElementById('isNetFalse');
        isNetObject.checked= true;
    }
    if (selectRecord.socialPrivileges==1){
        let socialPrivileges = document.getElementById('socialPrivilegesTrue');
        socialPrivileges.checked= true;
        } 
    else if (selectRecord.socialPrivileges==0) {     
        let socialPrivileges = document.getElementById('socialPrivilegesFalse');
        socialPrivileges.checked= true;
        }
    }
  
    }
    

function AddOption(Set, idOfEl){
temp=document.getElementById(idOfEl);
let option;
    for (selectRecord of Set) {
        option = document.createElement('option');
        option.innerHTML = selectRecord;
        option.value = selectRecord;
        temp.append(option);  
    }

}
function renderRecordsSelect(selectRecords) {
    let myset = new Set();
    let myset1 = new Set();
    let myset2 = new Set();
    for (selectRecord of selectRecords) {
        myset.add(selectRecord.admArea);
        myset1.add(selectRecord.typeObject);
        myset2.add(selectRecord.district);
           
    }
    AddOption(myset, 'admArea1'); 
    AddOption(myset, 'admArea');
    AddOption(myset1, 'typObj1');
    AddOption(myset1, 'typeObject');
    AddOption(myset2, 'dist1'); 
    AddOption(myset2, 'district'); 
    myset.clear();
    myset1.clear();
    myset2.clear();

}

function prepareForm(Form) {
    let result=`?`;
    for(let [name, value] of Form) {
       result+=`${name}=${value}&`; // key1=value1, потом key2=value2
      }
    
      return result

}
function deleteBtnHandler(event) {

    document.getElementById('actuallyDeleteBtn').dataset.recordId=event.target.dataset.recordId;
    document.getElementById('areYouSure').innerHTML = `Вы уверены, что хотите удалить данные предприятия ${document.getElementById(event.target.dataset.recordId).firstChild.innerHTML}?`

}
function putPagination(key=1) {

    document.getElementById('firstPageElement').dataset.value=currentPage;
    document.getElementById('firstPageElement').innerHTML=currentPage;
    document.getElementById('secondPageElement').dataset.value=+currentPage+1;
    document.getElementById('secondPageElement').innerHTML=+currentPage+1;
    document.getElementById('thirdPageElement').dataset.value=+currentPage+2;
    document.getElementById('thirdPageElement').innerHTML=+currentPage+2;
    document.getElementById('previousElement').dataset.value=+currentPage-1;
    document.getElementById('nextElement').dataset.value=+currentPage+1;


}

function editBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url, 'GET', function() {
        editRecord(this.response);
        
    })
    let adm = document.getElementById('staticBackdropLabel');
    adm.innerHTML = "Редактировать запись";
    document.getElementById('createBtn').hidden=true;
    
    let edit = document.getElementById('editBtn');
    edit.hidden=false;
    edit.dataset.recordId=event.target.dataset.recordId;

    



}
function renderRecord(record, key="s"){
    let row;
    let td;
    let btn;
    let edit;
    let info;
    if (key=="s"){ 
    row=document.createElement('tr')
    }else {
    row = document.getElementById(record.id);
    row.innerHTML = '';
    }
    
    row.id=record.id;
    td = document.createElement('td');
    td.innerHTML = record.name;
    row.append(td);
    if (screenWidth>482) {
    td = document.createElement('td');
    td.innerHTML = record.typeObject;
    row.append(td);
    td = document.createElement('td');
    td.innerHTML = record.address;
    row.append(td);
    }
    td = document.createElement('td');
    info = document.createElement('i');
    info.dataset.recordId = record.id;
    info.classList.add('fa');
    info.setAttribute("data-target","#showModal");
    info.setAttribute("data-toggle","modal");
    info.classList.add('fa-eye');
    info.onclick = showBtnHandler;
    td.append(info);
    edit = document.createElement('i');
    edit.dataset.recordId = record.id;
    edit.classList.add('fas');
    edit.setAttribute("data-target","#staticBackdrop");
    edit.setAttribute("data-toggle","modal");
    edit.classList.add('fa-pen');
    edit.onclick = editBtnHandler;
    td.append(edit);

    btn = document.createElement('i'); 
    btn.dataset.recordId =record.id;
    //btn.innerHTML = 'Удалить';
    btn.classList.add('fa');
    btn.classList.add('fa-trash');
    //btn.classList.add('btn-sm');
    btn.setAttribute("data-target","#exampleModal");
    btn.setAttribute("data-toggle","modal");
    btn.onclick = deleteBtnHandler;
    td.append(btn);
    row.append(td);
  
    return row;
    
}
function renderRecords(records, page){

   let t = document.getElementById('records').querySelector('tbody');
   t.innerHTML = '';

   for (let record = (page-1)*10; record<page*10; record++) {
        t.append(renderRecord(records[record]));
   }
}
function record_path(id){
    return `/api/data1/${id}?api_key=a4cadfc7-b02b-475e-afb7-ec4e80795c49&`
}


function sendRequest(url, method, onloadHandler, params){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);

}
function screenCheck(){
    if(screenWidth<482){
        document.getElementById('NotForMobile1').remove();
        document.getElementById('NotForMobile2').remove();
    }
}
let host = "http://exam-2020-1-api.std-900.ist.mospolytech.ru";
let records_path = "/api/data1";
let records_path1 = "/api/data1?api_key=a4cadfc7-b02b-475e-afb7-ec4e80795c49";

function myAlert(result,type,name){
    let alerttrigger = document.getElementById('for-alerts');
    let alertElement =document.createElement('div');
    alertElement.classList.add('alert');

    if (result==1){
    alertElement.classList.add('alert-info')
    if (type == "add"){
    alertElement.innerHTML = `Заведение ${name} успешно добавлено`;     
    } else if (type == "edit"){
    alertElement.innerHTML = `Заведение ${name} успешно изменено`;      
    }else{
    alertElement.innerHTML = `Заведение ${name} успешно удалено`;      
    }
    } else {
    alertElement.classList.add('alert-danger');
    alertElement.innerHTML = `Ошибка. Повторите попытку позднее`    
    }
    alertElement.classList.add('my-0');
    alerttrigger.append(alertElement);
    setTimeout( () => alertElement.remove(), 5000)
}
document.getElementById('createNewBtn').onclick = function (){
    document.getElementById('createForm').reset();
}




window.onload = function() {
    screenCheck();
    putPagination();
    let url = new URL(records_path, host);

    sendRequest(url, 'GET', function() {
    renderRecords(this.response,currentPage);
    renderRecordsSelect(this.response);
}); 

    document.getElementById('createNewBtn').onclick = function(){
        let adm = document.getElementById('staticBackdropLabel');
        adm.innerHTML = "Добавить новую запись";
        document.getElementById('createBtn').hidden=false;
        document.getElementById('editBtn').hidden=true;
        document.getElementById('createForm').reset();
    }

    document.getElementById('actuallyDeleteBtn').onclick = function(){
        let temp = this.dataset.recordId
        let url = new URL(record_path(this.dataset.recordId), host);
        sendRequest(url,'DELETE', function () {                                      
        document.getElementById(temp).remove();
        this.status==200 ? myAlert(1,`delete`," ") : myAlert(0,`delete`," ");
        

    });
    }
    document.getElementById('downloadDataBtn').onclick = function (){
        let url = new URL(records_path, host);
        let myForm = new FormData(document.getElementById('findForm'));
        sendRequest(url,'GET', function () {
            dintinctRecords(this.response, myForm);

        });
        
    }
    //////////////////////////////
    function hideAll(){
        let a = document.getElementsByTagName('tr');
        for(b of a){
            b.hidden=true;
        }
        for(let record = 1; record<a.length; record++){
            a[record].hidden=false;
        }
    }
    function dintinctRecords(records, Form){
        let t;
        t = document.getElementById('records').querySelector('tbody');
        t.innerHTML = '';
            for (record of records){
        
        
                if ( (Form.get('admArea')==record.admArea || Form.get('admArea')=="")  && (Form.get('district')==record.district || Form.get('district')=="") && (Form.get('typeObject')==record.typeObject || Form.get('typeObject')=="") &&(Form.get('socialPrivileges')==record.socialPrivileges || Form.get('socialPrivileges')=="")  ){                
                   t.append(renderRecord(record));
                }
               
            }
        
            hadAchoose=true;
            hideAll();
    }
    function doHide(page){
            let a = document.getElementsByTagName('tr');
             for(b of a){
                 b.hidden=true;
             }
             for(let record = (page-1)*10; record<page*10; record++){
                 a[record].hidden=false;
             }
    }
        ///////////////////////////////////////////////
    document.getElementById('greatPaginations').onclick = function(){

        let tempTarget = event.target.dataset.value;
        sendRequest(url,'GET', function () {
        if (!hadAchoose){
            renderRecords(this.response, tempTarget);
            currentPage=Number(tempTarget);
            putPagination(key=2);
        } else{
            currentPage=Number(tempTarget);
            doHide(currentPage);
            putPagination(key=2);
        }
 
        });
    }
    document.getElementById('editBtn').onclick = function (){ 
        let params = new FormData(document.getElementById('createForm'));
        let urlId = record_path(document.getElementById('editBtn').dataset.recordId)+prepareForm(params);
        let url = new URL(urlId, host);
        sendRequest(url,'PUT', function() {
            renderRecord(this.response, key="notS");        
            this.status==200 ? myAlert(1,`edit`,this.response.name) : myAlert(0,`edit`,this.response.name);
        });

        document.getElementById('createForm').reset();
    }

    document.getElementById('createBtn').onclick = function (){

        let url = new URL(records_path1, host);
        let params = new FormData(document.getElementById('createForm'));

        sendRequest(url,'POST', function () {
            document.getElementById('records').querySelector('tbody').append(renderRecord(this.response));
            this.status==200 ? myAlert(1,`add`,this.response.name) : myAlert(0,`add`,this.response.name);
            
        }, params );
 
        document.getElementById('createForm').reset();
    }

}