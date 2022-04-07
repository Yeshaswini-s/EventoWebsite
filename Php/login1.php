<?php
$user=$_POST["user"];
$pswd=$_POST["password"];
$dob=$_POST["dob"];
$conn = new mysqli("evento.cdjsji8blfcw.ap-south-1.rds.amazonaws.com","admin","Loafer123","evento",3306);
$sql = "SELECT UserName, Pswd from registration";

//$conn->query($sql);
if ($conn->query($sql) === TRUE) 
{
//echo "New record created successfully<BR><BR><BR>";
echo "<script LANGUAGE='JavaScript'>
window.alert('SignUp Successfull');
window.location. href='http://localhost//EventoWebsite/loginpage1.html';
</script>";

} 
else 
{
  // echo "Error: " . $sql . "<br>" . $conn->error;
  echo "<script LANGUAGE='JavaScript'>
window.alert(SignUp Unuccessfull');
window.location. href='http://localhost//EventoWebsite/loginpage1.html';
</script>";
}
$conn->close();
?>
