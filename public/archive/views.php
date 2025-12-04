<?php
// views.php
function pv_db() {
    static $pdo = null;
    if (!$pdo) {
        $host = 'localhost';
        $dbname = 'u1060934_default';
        $username = 'u1060934_user_stat';
        $password = 'Qazwsxedc86';

        
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Создаем таблицу если не существует
            // $pdo->exec('CREATE TABLE IF NOT EXISTS page_views (
            //     path VARCHAR(500) PRIMARY KEY,
            //     views INTEGER NOT NULL DEFAULT 0,
            //     INDEX views_index (views)
            // ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
    return $pdo;
}

function pv_is_bot() {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    if ($ua === '') return false;
    return (bool)preg_match('~bot|crawler|spider|preview|facebookexternalhit|whatsapp|telegram|vkShare~i', $ua);
}

// Опционально: ограничить повторный инкремент за короткий период:
function pv_should_count($path) {
    // Простая защита от "F5": 10 минут на пользователя
    $key = 'pv_' . md5($path);
    if (!isset($_COOKIE[$key])) {
        setcookie($key, '1', time() + 600, '/'); // !! 30 sec, 600 - 10 min
        return true;
    }
    return false;
}

function pv_increment_and_get($path = null) {
    if ($path === null) {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
    }

    // Игнорируем очевидных ботов и превью-ботов
    if (pv_is_bot()) {
        return pv_get($path);
    }

    $pdo = pv_db();
    $pdo->beginTransaction();
    
    try {
        // Используем INSERT ... ON DUPLICATE KEY UPDATE для MySQL
        if (pv_should_count($path)) {
            $stmt = $pdo->prepare('INSERT INTO page_views (path, views) 
                                   VALUES (:path, 1) 
                                   ON DUPLICATE KEY UPDATE views = views + 1');
            $stmt->execute([':path' => $path]);
        } else {
            // Если не считаем, все равно убедимся что запись существует
            $stmt = $pdo->prepare('INSERT IGNORE INTO page_views (path, views) 
                                   VALUES (:path, 0)
                                   ON DUPLICATE KEY UPDATE views = views');
            $stmt->execute([':path' => $path]);
        }

        $stmt = $pdo->prepare('SELECT views FROM page_views WHERE path = :path');
        $stmt->execute([':path' => $path]);
        $views = (int)$stmt->fetchColumn();
        $pdo->commit();

        return $views;
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log("Page views error: " . $e->getMessage());
        return pv_get($path); // Fallback без инкремента
    }
}

function pv_get($path) {
    $pdo = pv_db();
    $stmt = $pdo->prepare('SELECT views FROM page_views WHERE path = :path');
    $stmt->execute([':path' => $path]);
    return (int)($stmt->fetchColumn() ?: 0);
}
?>