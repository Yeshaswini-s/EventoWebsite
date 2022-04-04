<?php
$user=$_POST["user"];
$name=$_POST["name"];
$email=$_POST["email"];
$phone=$_POST["phnum"];
$pswd =$_POST["password"];
$hash = password_hash($pswd, PASSWORD_DEFAULT);

$address=$_POST["address"];
$dob=$_POST["dob"];
$conn = new mysqli("evento.cdjsji8blfcw.ap-south-1.rds.amazonaws.com","admin","Loafer123","evento",3306);
$sql = "INSERT INTO registration(Name,Pswd,mail,phnum,Dob,UserName) VALUES ('$name','$hash','$email','$phone','$dob','$user')";

//$conn->query($sql);
if ($conn->query($sql) === TRUE) 
{
//echo "New record created successfully<BR><BR><BR>";
echo "<script LANGUAGE='JavaScript'>
window.alert('SignUp Successfull');
// window.location. href='http://localhost//EventoWebsite/loginpage1.html';
history.back();
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