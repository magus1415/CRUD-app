const URL_ENDPOINT = "http://localhost:3000/users";

// retrieving the info and appending data when remove button clicked
$.get(URL_ENDPOINT)
   .then(function (data) {
      data.map(name => {
         $('tbody').append(
            $(`
            <tr>
               <td>${name.id})</td>
               <td>${name.firstName}</td>
               <td>${name.lastName}</td> 
               <td>${name.country}</td>
               <td><button class="btn btn-danger" onclick="removeUser(${name.id})">Remove</button></td>
            </tr>`)
         )
      })
   })

// adding a user with add new name button
$("#form-btn").on('click', function () {
   $.ajax({
      url: URL_ENDPOINT,
      method: 'POST',
      data: {
         firstName: $('#firstName').val(),
         lastName: $('#lastName').val(),
         country: $('#country').val()
      },
      success: function (data) {
         console.log("Data: " + data);
         // Handle the response after the successful POST request
      },
      error: function (error) {
         console.error('Error:', error);
      }
   });
});

// deleting user with remove button
function removeUser(id) {
   $.ajax({
      url: `${URL_ENDPOINT}/${id}`, // Replace with the URL of your delete endpoint
      method: 'DELETE',
      success: function () {
         console.log('Item deleted successfully');
         //  Finds and removes the table row that contains a specific <td> cell with the text matching the id variable
         
         // Handle any post-deletion actions
      },
      error: function (error) {
         console.error('Error deleting item:', error);
         // Handle errors, such as displaying an error message
      }
   });
}

// editing info with edit name button
$('#edit-btn').on('click', function () {
   const id = $('#updateId').val();

   $.ajax({
      url: `${URL_ENDPOINT}/${id}`,
      method: 'PUT',
      data: {
         firstName: $('#updateFirstName').val(),
         lastName: $('#updateLastName').val(),
         country: $('#updateCountry').val()
      },
      success: function (data) {
         console.log('User updated successfully');
         console.log(data);

         $.get(URL_ENDPOINT);
      },
      error: function (error) {
         console.log('Error updating user:', error);
      }
   });
})


