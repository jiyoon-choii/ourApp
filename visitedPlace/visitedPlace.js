$(document).ready( async function() {

    const catPrimaryResponse = await loadPlaceMasterList("http://35.230.26.44:8080/api/v1/tags?page=1&perPage=15")
    console.log(catPrimaryResponse);
    let testData = new Object();
    testData.body = {
        "page": 1,
        "perPage": 15,
        "totalPage": 1,
        "totalCount": 2,
        "data": [
          {
            "id": 1,
            "tagType": "좋아용",
            "tagName": "좋아용"
          },
          {
            "id": 2,
            "tagType": "맛있어용",
            "tagName": "맛있어용"
          }
        ]
      }
      console.log(testData);


      let data = testData.body.data;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        let  str = 
        `<tr>
            <th scope="row">${data[i].id}</th>
            <td scope="">${data[i].placeName}</td>
            <td scope="">${data[i].fullAddress}</td>
            <td scope="">장소 대분류</td>
            <td scope="">장소 중분류</td>
            <td scope=""><a href=${data[i].refLink}>참조링크</a></td>
         </tr>`;
        $("#dataTableBody").append(str)
      }

})

async function loadPlaceMasterList(url){
    // 분류 목록 불러오기
      
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE 등
        headers: {
          "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
      });

      return response;      
  }