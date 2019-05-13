$(document).ready(()=>{
    $('.delete-item').on('click', (e)=>{
        $target= $(e.target);
        const id = $target.attr('data-id');
  
    $.ajax({
        type: 'DELETE',
        url: '/cart/'+ id,
        success:(response)=>{
            alert('Deleting item');
            window.location.href='/';
        },
        error:(err)=>{
            console.log(err);
        }
    })
})
})