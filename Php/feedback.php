<?php
$name=$_POST["name"];
$email=$_POST["email"];
$phone=$_POST["phnum"];
$about=$_POST["about"];
$message=$_POST["feedback"];
$conn = new mysqli("evento.cdjsji8blfcw.ap-south-1.rds.amazonaws.com","admin","Loafer123","evento",3306);
$sql = "INSERT INTO feedbackf(name,email,phone,message,about) VALUES ('$name','$email','$phone','$message','$about')";

//$conn->query($sql);
if ($conn->query($sql) === TRUE) 
{
//echo "New record created successfully<BR><BR><BR>";
echo "<script LANGUAGE='JavaScript'>
window.alert('Form Submitted Successfully');
window.location. href='http://localhost:3307/EventoWebsite/feedback1.html';
</script>";

} 
else 
{
  // echo "Error: " . $sql . "<br>" . $conn->error;
  echo "<script LANGUAGE='JavaScript'>
window.alert('Form Submition Unuccessfully');
window.location. href='http://localhost:3307/EventoWebsite/feedback1.html';
</script>";
}
$conn->close();
?>