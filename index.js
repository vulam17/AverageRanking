let array=[]
let index = 0
let sortType = true
let tongleSort, tongleMark
function checkData()//Kiểm tra tính hợp lệ dữ liệu
{
    let name = document.getElementById("ten").value
    let math = document.getElementById("toan").value
    let phy = document.getElementById("ly").value
    let chem = document.getElementById("hoa").value
    if(((name.trim())!=="") && ((math >= 0)&&(math <= 10)) &&  ((phy >= 0)&&(phy <= 10)) && ((chem >= 0)&&(chem <= 10)))
    save()
    else
    alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!")
}
function save()//Lưu dữ liệu
{
    index = array.length
    array[index] = {
        no: index + 1,
        name: document.getElementById("ten").value,
        math: document.getElementById("toan").value,
        phy: document.getElementById("ly").value,
        chem: document.getElementById("hoa").value,
        average: 0
    }
    averageCal()
    display()
}
function averageCal()//Tính trung bình cộng
{
    for(i = 0; i < array.length; i++)
    {
        array[i].average = ((Number(array[i].math) + Number(array[i].phy) + Number(array[i].chem))/3).toFixed(2)
    }
}
function exSort()//Hightlight học sinh giỏi
{
    let count = 0;
    for(i = 0; i < array.length; i++)
    {
        if(array[i].average >= 8) 
        {
            count++
            document.getElementById(`${i}-0`).style.backgroundColor = "tomato"
            document.getElementById(`${i}1`).style.backgroundColor = "tomato"
            document.getElementById(`${i}2`).style.backgroundColor = "tomato"
            document.getElementById(`${i}3`).style.backgroundColor = "tomato"
            document.getElementById(`${i}4`).style.backgroundColor = "tomato"
            document.getElementById(`${i}5`).style.backgroundColor = "tomato"
            document.getElementById(`${i}6`).style.backgroundColor = "tomato"
        }
    }
    if(array.length === 0) 
    {
        alert("Không có dữ liệu để hightlight") 
    } else
    {
        if (count == 0) alert("Không có học sinh giỏi nào!")
    }
}
function sort()//Lọc từ lớn đến bé hoặc từ bé đến lớn
{
    let tempObject = {name:"", math:0, phy:0, chem:0, average:0};
    for(i = 0; i < array.length; i++)
    {
        for(j = 0; j < array.length; j++)
        {
            if(sortType === true)
            {
                if(Number(array[j].average) < Number(array[i].average))
                {
                    tempObject.name = array[j].name
                    tempObject.math = array[j].math
                    tempObject.phy = array[j].phy
                    tempObject.chem = array[j].chem
                    tempObject.average = array[j].average

                    array[j].name = array[i].name
                    array[j].math = array[i].math
                    array[j].phy = array[i].phy
                    array[j].chem = array[i].chem
                    array[j].average = array[i].average

                    array[i].name = tempObject.name
                    array[i].math = tempObject.math
                    array[i].phy = tempObject.phy
                    array[i].chem = tempObject.chem
                    array[i].average = tempObject.average
                }
            } 
            else
            {
                if(Number(array[j].average) > Number(array[i].average))
                {
                    tempObject.name = array[j].name
                    tempObject.math = array[j].math
                    tempObject.phy = array[j].phy
                    tempObject.chem = array[j].chem
                    tempObject.average = array[j].average

                    array[j].name = array[i].name
                    array[j].math = array[i].math
                    array[j].phy = array[i].phy
                    array[j].chem = array[i].chem
                    array[j].average = array[i].average

                    array[i].name = tempObject.name
                    array[i].math = tempObject.math
                    array[i].phy = tempObject.phy
                    array[i].chem = tempObject.chem
                    array[i].average = tempObject.average
                }
            }
        }
    }
    display()
}
function smallestToLargest()
{
    sortType = false;
    sort()
}
function largestToSmallest()
{
    sortType = true;
    sort()
}
function selectSort()//1 nút cho cả chức năng lọc từ to đến nhỏ và từ nhỏ đến to
{
    if ((document.getElementById("sortButtonHide").innerHTML === "Sắp xếp tăng") && (array.length !== 0)) 
    {
        smallestToLargest()
        document.getElementById("sortButtonHide").innerHTML = "Sắp xếp giảm"
    }
    else if((document.getElementById("sortButtonHide").innerHTML === "Sắp xếp giảm") && (array.length !== 0)) 
    {
        largestToSmallest()
        document.getElementById("sortButtonHide").innerHTML = "Sắp xếp tăng"
    }
    if(array.length === 0) alert("Không có dữ liệu để sắp xếp")
}
function markAll()
{
    tongleMark = document.getElementById("deleteAll").checked
    if (tongleMark === true)
    {
        for(i = 0; i < array.length; i++)
        {
            document.getElementById(`${i}0`).checked = true
        }
    }
    else
    {
        for(i = 0; i < array.length; i++)
        {
            document.getElementById(`${i}0`).checked = false
        }
    }
}
function del()
{
    let statusCheckBox = 0;
    if(array.length === 0) alert("Không có dữ liệu để xóa")
    for(i = array.length - 1; i>= 0; i--)
    {
       
        if(document.getElementById(`${i}0`).checked == true)
        {
            array.splice(i,1)
            statusCheckBox++
        }
    }
    if(array.length !== 0)
    {
        if (statusCheckBox === 0) alert("Hãy chọn dòng dữ liệu cần xóa")
    }
    refreshNo()
    display()
}
function refreshNo()
{
    for(i = 0; i < array.length; i++)
        {
            array[i].no = i + 1
        }
}
function display()//Hiển thị
{
    let outData = "";
    for(i = 0; i < array.length; i++)
    {
        outData += 
        `<tr>
            <td id = ${i}-0><input type="checkbox" id = ${i}0  style = "width:18px; height:18px;"></td> 
            <td id = ${i}1>${array[i].no}</td> 
            <td id = ${i}2>${array[i].name}</td>
            <td id = ${i}3>${array[i].math}</td>
            <td id = ${i}4>${array[i].phy}</td>
            <td id = ${i}5>${array[i].chem}</td> 
            <td id = ${i}6>${array[i].average}</td>   
        </tr>`
    }
        document.getElementById("moreData").innerHTML = 
        `
        <tr>
            <th>Delete
                <input type="checkbox" style = "width:18px; height:18px;" id = "deleteAll" onclick = markAll()>
            </th>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Điểm Toán</th>
            <th>Điểm Lý</th>
            <th>Điểm Hóa</th>
            <th>Điểm trung bình
                <i id = "sortIcon" onclick = largestToSmallest() class="fa-solid fa-arrow-down-wide-short"></i>
                <i id = "sortIcon" onclick = smallestToLargest() class="fa-solid fa-arrow-down-short-wide"></i>
            </th>
        </tr>
        `+ outData
        document.getElementById("btn").innerHTML = 
        `<button id = "buttonChange" onclick = exSort()>Hightlight học sinh giỏi</button>
        <button id = "sortButtonHide" onclick = selectSort()>Sắp xếp tăng</button>
        <button id = "delete" onclick = del()>Xóa dữ liệu</button>`
}