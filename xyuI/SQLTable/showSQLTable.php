<?php
$tn = $_GET['tableName'];
function getColumnName($connection, $tableName){
	$result = $connection->query("SHOW COLUMNS FROM {$tableName}");
	//$arr = [];
	for($i=0;$i<$result->num_rows;$i++)
	{
		$row = $result->fetch_assoc();
		$arr[$i] = $row["Field"];
	}
	return $arr;
};
function showSQLTable($host, $user, $password, $database, $tableName){
	$connection = new mysqli($host, $user, $password, $database);
	if($connection->connect_errno)
		die($connection->mysqli_connect_error);
$connection->query("SET NAMES 'utf8'");
	//$table = [];
	$table[0] = getColumnName($connection, $tableName);
	$result = $connection->query("SELECT * FROM {$_GET['tableName']}");
	for($i=0;$i<$result->num_rows;$i++)
	{
		//$table[$i+1] = [];
		$aux = $result->fetch_assoc();
		for($j=0; $j<count($table[0]); $j++)
			$table[$i+1][$j] = $aux[$table[0][$j]];
	}
	return $table;
};
	
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="table.css"/>
	<script src="xyui.js"></script>
	<script src="modal.js"></script>
	<script src="table.js"></script>
</head>
<body>
	<h3>Table <?php echo "\"{$_GET['tableName']}\""?></h3><h3 id="t"></h3>
	<?php
		$table = showSQLTable("localhost","","","test",$_GET["tableName"]);
		$jsonTable = json_encode($table);
		echo "<script>
			var table = {$jsonTable};
			document.getElementById('t').innerHTML = table;
			xyui.table.create(table.length, table[0].length, null, table, {headH:true, headV:true, headX:true, hl:'v',hlcolor:'seagreen', tableName:'{$tn}'});
		</script>";
	?>
</body>
</html>