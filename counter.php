<?php
$counterFile = 'counter.txt';

// Initialize the counter if the file doesn't exist
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '0');
}

// Function to get the current counter value
function getCounter() {
    global $counterFile;
    return (int)file_get_contents($counterFile);
}

// Function to increment the counter
function incrementCounter() {
    global $counterFile;
    $counter = getCounter() + 1;
    file_put_contents($counterFile, $counter);
    return $counter;
}

// Handle the request
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['count' => getCounter()]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode(['count' => incrementCounter()]);
}
?>
