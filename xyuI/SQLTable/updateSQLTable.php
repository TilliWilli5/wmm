<?php
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
	$result->close();
	$connection->close();
	//$table["tableName"] = $tableName;
	$ans[0] = $table;
	$ans[1] = $tableName;
	return $ans;
};
function updateSQLTable($host, $user, $password, $database, $tableName, $litter, $modified){
	$connection = new mysqli($host, $user, $password, $database);
	if($connection->connect_errno)
		die($connection->mysqli_connect_error);
	$connection->query("SET NAMES 'utf8'");
	$head = getColumnName($connection, $tableName);
	$q = "INSERT INTO {$tableName} VALUES";
	for($i=0;$i<count($litter);$i++)
	{
		$q .= "(";
		for($j=0;$j<count($litter[$i]);$j++)
		{
			if($litter[$i][$j] !== "")
				$q .= "'{$litter[$i][$j]}'";
			else
				$q .= "NULL";
			if($j< (count($litter[$i])-1) )
				$q .= ",";
		}
		$q .= ")";
		if($i < (count($litter)-1) )
			$q .=",";
	}
	echo $q;
	$connection->query($q);
	for($i=0;$i<count($modified);$i++)
	{
		if($modified[$i] != "")
		{
			$q = "UPDATE {$tableName} SET ";
			for($j=0;$j<count($modified[$i]);$j++)
			{
				if($modified[$i][$j] != "")
				{
					$q .= $head[$j]."='".$modified[$i][$j]."'";
					if($j< (count($modified[$i])-1) )
						$q .= ",";
				}
			}
			$q .= " WHERE id=".$i;
			echo $q;
			$connection->query($q);
		}
	}
	$connection->close();
};
$param = json_decode(file_get_contents('php://input'));
print_r($param);
$p = "xyuIO";
$tableName = $param[2];
echo "tableName:".$tableName;

echo "litter:";
print_r($param[0]);
echo "modified:";
print_r($param[1]);

if($p == $param[3])
{
	updateSQLTable("localhost","","","test",$tableName, $param[0], $param[1]);
}
else
	echo "You have no access";
?>