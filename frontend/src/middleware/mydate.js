exports.dateFormat = function(myDate){
 //let data= myDate.substring(0, 19).replace("Z", "T")  
  let date = new Date(
        myDate.substring(0, 19).replace("Z", "T")
      );
      let tab = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ];
      let info = tab[date.getDay()] + " ";
      info += date.getDate();
      let lesMois = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novenbre",
        "décembre",
      ];
      info += " " + lesMois[parseInt(date.getMonth())];
      info += " " + date.getHours() + "H";
      if (date.getMinutes() < 10) info += "0";
      info += date.getMinutes();
      //console.log(info);
      return info;
}
    
   