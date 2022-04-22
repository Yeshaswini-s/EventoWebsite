const array1 = [
    {
        "id": 6,
        "type": "artists",
        "imagelink": "https://iili.io/VNSR24.md.jpg",
        "name": "Aman Jain",
        "capacity": "Dancer spec",
        "price": "Rs 4500",
        "uniqueId": "235"
    },
    {
        "id": 7,
        "type": "artists",
        "imagelink": "https://i.ibb.co/JRxnhP5/images-q-tbn-ANd9-Gc-Q4xc-Kt-M4u-Ff0ltl-Ch61980-PPFMK3r8-Bfqq-A-usqp-CAU.jpg",
        "name": "Victor Wilson",
        "capacity": "Singing spec",
        "price": "Rs 1550",
        "uniqueId": "242"
    },
    {
        "id": 8,
        "type": "venue",
        "imagelink": "https://i.ibb.co/CMcc3Vm/slider4.jpg",
        "name": "Sidharth Banquet Hall",
        "capacity": "200 cap",
        "price": "Rs 27000",
        "uniqueId": "102"
    },
    {
        "id": 9,
        "type": "venue",
        "imagelink": "http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg",
        "name": "Manali Marriage Hall",
        "capacity": "120 cap",
        "price": "Rs 45000",
        "uniqueId": "106"
    },
    {
        "id": 10,
        "type": "venue",
        "imagelink": "https://i.ibb.co/DfLPwRv/images-q-tbn-ANd9-Gc-QYv-CBz-SSPS7my-YVV1d-D9ij-Bft-PAHvpw-Byz-Ag-usqp-CAU.jpg",
        "name": "Sun City",
        "capacity": "1200 cap",
        "price": "Rs 100000",
        "uniqueId": "107"
    },
    {
        "id": 11,
        "type": "venue",
        "imagelink": "https://i.ibb.co/fDFmKXL/1566838159-Screenshot-from-2019-08-26-22-13-19.png",
        "name": "Krishanam Gardens",
        "capacity": "1200 cap",
        "price": "Rs 85000",
        "uniqueId": "105"
    }
];

let arr2 = [];

array1.forEach(element =>{
               console.log(element.type[0])
              arr2.push(element.type[0]);
  			 
});

let unq = new Set(arr2);
unq = Array.from(unq);
unq = unq.join("")


console.log(unq)