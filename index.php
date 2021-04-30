<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <!-- Bootstrap Js  -->
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>

  <!-- Mon CSS -->
  <link rel="stylesheet" href="style.css">
  
   <!-- Mon Js  -->
  <script type="text/javascript" src="script.js"></script>
</head>

<body class="text-center">
  <main role="main">
    <div class="container" id="haut_page">

      <h1 align="text-center"> Entrer le nom d'un médicament </h1>

      <input type="text" id="search" name="search" class="form-control" placeholder="Nom du médicament" autofocus>

      <ul id="suggestions">
      </ul>
      <div>
        <button type="button" id="btn_search" class="btn btn-secondary"> <a href="#haut_page"> Nouvelle recherche </a></button>
      </div>
      <div id="listeMedicaments">

      </div><!-- Fin listeMedicaments !-->

      
      
    </div><!-- Fin container !-->
  </main><!-- Fin main !-->
</body>
</html>

