
let table = document.getElementsByTagName("tbody")[0]

let maindict = {};

for (let i = 0; i<table.children.length; i++){
    let table_children = [];

    for (let j = 1; j<table.children[i].children.length; j++){

        let daddy = [];
        for (let k = 0; k<table.children[i].children[j].children.length; k++){

                let table_grandchildren = [];
                
                if (table.children[i].children[j].children[k].className.includes("Equals")){
                    table_grandchildren.push("red")
                }

                try{
                    for (let z = 0; z < 3; z++){
                        table_grandchildren.push(table.children[i].children[j].children[k].children[z].innerText)
                    }
                    daddy.push(table_grandchildren)
                }
                catch(rame){
                    table_grandchildren.push([])
                }
                
        }
        table_children.push(daddy)

    }

    maindict[table.children[i].children[0].innerHTML] = table_children;
}

console.log(maindict);

let weekdays = ['ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი',': შაბათი']

let sortedlist = []

for (let j = 0; j < weekdays.length; j++) {
    let day = [];
    Object.keys(maindict).forEach(key => {
        const value = maindict[key];

        for (let i = 0; i < value.length; i++) {

            for (let k = 0; k<value[i].length; k++){
                
                if (value[i][k].length > 0 && value[i][k][value[i][k].length - 1].includes(weekdays[j])) {
                    day.push([key, i, k]);
                }
            }

        }
    });

    sortedlist.push(day);
}


function extracttime(subject){
    return parseInt(subject[subject.length-1].split(' ')[4].split(':')[0])
}

function extractendtime(subject){
    return parseInt(subject[subject.length-1].split(' ')[6].split(':')[0])
}



function sortbytime(list){

    let sorted = []
    let newls = []

    for (let i = 0; i<list.length; i++){

        subject = maindict[list[i][0]][list[i][1]][list[i][2]]

        if (sorted.length == 0){
            sorted.push(subject)
            newls.push(list[i])
        }
        else{
            let time=extracttime(subject)
            let index = 0
            while (index < sorted.length && time>=extracttime(sorted[index])){
                index++;
            }
            sorted.splice(index,0,subject)
            newls.splice(index,0,list[i])
        }
    
    }

    let spliceint=0

    for (let i = 1; i<sorted.length; i++){
        let dif = extracttime(sorted[i])-extractendtime(sorted[i-1])
        if (dif > 1){
            newls.splice(i+spliceint,0,[`შესვენება ${dif-1} საათი`, `${extractendtime(sorted[i-1])+1}:00 - ${extracttime(sorted[i])}:00`])
            spliceint++
        }
    }

    return newls
}


for (let i = 0; i < 6; i++){

    sortedlist[i] = sortbytime(sortedlist[i])

}

function addbreak(list){

    return list

}

console.log(sortedlist)


let table2 = document.getElementsByTagName('table')[0].parentNode.parentNode.innerHTML=`<div class="timetable">
<div class="column">
    <div class="day">ორშაბათი</div>
    <div class="lectures">
        <div class="lecture">
            <p>ლექცია 12 - 12:50</p>
            <p>დისკრეტული სტრუქტურები</p>
            <p>XI კორპუსი/1 სართული/107</p>
            <p>პედაგოგ(ებ)ი: ყიფიანი არჩილ</p>
        </div>
        <div class="lecture">
            <p>ლექცია 12 - 12:50</p>
            <p>დისკრეტული სტრუქტურები</p>
            <p>XI კორპუსი/1 სართული/107</p>
            <p>პედაგოგ(ებ)ი: ყიფიანი არჩილ</p>
        </div>
        <div class="lecture">
            <p>ლექცია 12 - 12:50</p>
            <p>დისკრეტული სტრუქტურები</p>
            <p>XI კორპუსი/1 სართული/107</p>
            <p>პედაგოგ(ებ)ი: ყიფიანი არჩილ</p>
        </div>

    </div>
</div>
<div class="column">
    <div class="day">სამშაბათი</div>
    <div class="lectures">
        <div class="lecture">
            <p>პრაქტიკული 12 - 12:50</p>
            <p>დისკრეტული სტრუქტურები</p>
            <p>XI კორპუსი/1 სართული/107</p>
            <p>პედაგოგ(ებ)ი: ყიფიანი არჩილ</p>
        </div>
        <div class="lecture">
            <p>ლექცია 12 - 12:50</p>
            <p>დისკრეტული სტრუქტურები</p>
            <p>XI კორპუსი/1 სართული/107</p>
            <p>პედაგოგ(ებ)ი: ყიფიანი არჩილ</p>
        </div>
        <div class="break">
          <p>შესვენება 2 საათი</p>
          <p></p>
          <p></p>
        </div>
    </div>
</div>
<div class="column">
    <div class="day">ოთხშაბათი</div>
    <div class="lectures"></div>
</div>
<div class="column">
    <div class="day">ხუთშაბათი</div>
    <div class="lectures"></div>
</div>
<div class="column">
    <div class="day">პარასკევი</div>
    <div class="lectures"></div>
</div>
<div class="column">
    <div class="day no-border">შაბათი</div>
    <div class="lectures"></div>
</div>
</div>
`
