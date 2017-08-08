console.log('Javascript ready to go...')

$('.remove').on('click', function (e) {
  var $input = $(this).siblings('input')
  var taskName = $input.val()
  $.ajax({
    url: '/tasks/' + taskName.trim(),
    method: 'DELETE'
  })
  .then(data => {
    window.location.reload()
  })
})

$('.done').on('click', function (e) {
  var $input = $(this).siblings('input')
  var taskName = $input.val()
  $.ajax({
    url: '/completed/' + taskName,
    method: 'PUT'
  })
  .then(data => {
    window.location.reload()
  })
})

$('.doneAll').on('click', function (e) {
  console.log('okay')
  $.ajax({
    url: '/completed/all',
    method: 'PUT'
  })
  .then(data => {
    window.location.reload()
  })
})
