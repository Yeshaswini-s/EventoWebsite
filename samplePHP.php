<?php 
$conn = new mysqli("evento.cdjsji8blfcw.ap-south-1.rds.amazonaws.com","admin","Loafer123","evento",3306);
$query="select * from Feedback"; 
$result=mysql_query($query); 
?>
<!DOCTYPE html>
<html>

<head>
    <title> Fetch Data From Database </title>
</head>

<body>
    <table align="center" border="1px" style="width:600px; line-height:40px;">
        <tr>
            <th colspan="4">
                <h2>Feedbacks</h2>
            </th>
        </tr>
        
        <th> Name </th>
        <th> Email </th>
        <th> About </th>
        <th> Message </th>

        </tr>

        <?php while($rows=mysql_fetch_assoc($result)) 
		{ 
		?>
        <tr>
            <td>
                <?php echo $rows['name']; ?>
            </td>
            <td>
                <?php echo $rows['mail']; ?>
            </td>
            <td>
                <?php echo $rows['about']; ?>
            </td>
            <td>
                <?php echo $rows['message']; ?>
            </td>
        </tr>
        <?php 
             } 
             $conn->close();
        ?>

    </table>
</body>

</html>