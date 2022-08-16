/**
 * index.js
 * This class is designed to handle the new user, update user, 
 *  and delete button calls on the main page
 */

// add_user function call
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully")
})

// update_user function call
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })

    console.log(data.id)

    var request = {
        "url" : 'http://localhost:3000/api/users/' + data.id,
        "method" : "PUT", 
        "data" : data 
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully")
        window.location.pathname = "../"
        location.reload()
    })
})

// delete function call; only run if in root page
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : 'http://localhost:3000/api/users/' + id,
            "method" : "DELETE", 
        }

        if(confirm("Do you want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully");
                location.reload();
            })
        }        
    })
}