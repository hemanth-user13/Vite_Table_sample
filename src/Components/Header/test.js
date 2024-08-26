let arr=[
    {
        id:1,
        name:"test1"
    },
    {
        id:2,
        name:"test2"
    },
    {
        id:3,
        name:"test3"
    },
    {
        id:1,
        name:"test11"
    },
    {
        id:2,
        name:"test22"
    },
    {
        id:3,
        name:"test33"
    },
    {
        id:1,
        name:"test111"
    },
    {
        id:2,
        name:"test222"
    },
    {
        id:3,
        name:"test333"
    }
]

let data={}

arr.forEach(item => {
    if (data[item.id]) {
        data[item.id].push(item.name);
    } else {
        data[item.id] = [item.name];
    }
});

console.log(data);
console.log(Object.values(data));


let newresult=arr.reduce((acc,item)=>{
    acc[item.id]=acc[item.id] || []
    acc[item.id].push(item.name)
    return acc
},{})

console.log(newresult)

let data1={};
arr.forEach(item=>{
    data1[item.id]?data1[item.id].push(item.name):data1[item.id]=[item.name]

})


console.log("the second result is ",data1)


let data11 = {};

for (let item of arr) {
    if (!data11[item.id]) {
        data11[item.id] = [];
    }
    data11[item.id].push(item.name);
}


console.log(data11)