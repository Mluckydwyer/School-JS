<!DOCTYPE html>
<head>
    <?php readfile($folder = 'Head.html'); ?>
</head>

<body>
<div class="container">

    <?php readfile($folder = $_SERVER['DOCUMENT_ROOT'] . '\Listr\Resources\HTML\Listr Header.html');
          readfile($folder = 'Listr.html');
          readfile($folder = $_SERVER['DOCUMENT_ROOT'] . '\Listr\Resources\HTML\Listr Footer.html'); ?>

</div>
</body>
</html>
