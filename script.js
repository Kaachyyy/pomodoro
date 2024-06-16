// Valeurs par défaut des segments Pomodoro, des pauses courtes et des pauses longues
let pomodoro = 25; // Segment Pomodoro par défaut en minutes
let short_break = 15; // Pause courte par défaut en minutes
let long_break = 30; // Pause longue par défaut en minutes



// Récupérer les éléments de la page
const modal = document.getElementById("form_settings"); // Fenêtre modale des paramètres
const btn_settings = document.getElementById("btn_settings"); // Bouton pour ouvrir les paramètres
const span = document.getElementsByClassName("close")[0]; // Bouton de fermeture de la fenêtre modale

const btn_pomodoro = document.getElementById("btn_pomodoro"); // Bouton pour définir le minuteur sur le segment Pomodoro
const btn_short = document.getElementById("btn_short"); // Bouton pour définir le minuteur sur la pause courte
const btn_large = document.getElementById("btn_large"); // Bouton pour définir le minuteur sur la pause longue
const timer = document.getElementById("timer"); // Élement d'affichage du minuteur
const btn_reset = document.getElementById("btn_reset");
const pomodoro_input = document.getElementById("pomodoro_input");
const short_break_input = document.getElementById("short_break_input");
const long_break_input = document.getElementById("long_break_input");
const aura_select = document.getElementById("aura_select"); // Sélecteur d'aura

const aura_preview = document.getElementById("aura_preview"); // Image d'aperçu de l'aura




let mode = pomodoro; // Indique le mode courant du minuteur


timer.textContent = pomodoro + ":00"; // Affiche 25:00 (par défaut)

let isRunning = false; // Indique si le minuteur est en cours d'exécution
let timeLeft; // Temps restant pour le minuteur

// Quand le bouton Pomodoro est cliqué, afficher la durée du segment Pomodoro
btn_pomodoro.onclick = function(){
    if (mode != pomodoro) {
        timer.textContent = formatTime(pomodoro * 60)// Affiche 25:00 (par défaut)
        clearInterval(timerInterval); // Arrête tout minuteur en cours
        btn_start.textContent = "start"; // Change le texte du bouton en "Start"
        timeLeft = pomodoro * 60;
        isRunning = false;
    }
    mode = pomodoro;
    

}




// Quand le bouton de pause courte est cliqué, afficher la durée de la pause courte
btn_short.onclick = function(){
    if (mode != short_break) {
        timer.textContent = formatTime(short_break * 60) // Affiche 15:00 (par défaut)
        clearInterval(timerInterval); // Arrête tout minuteur en cours
        btn_start.textContent = "start"; // Change le texte du bouton en "Start"
        timeLeft = short_break * 60;
        isRunning = false;
    }
    mode = short_break;
    

}

// Quand le bouton de pause longue est cliqué, afficher la durée de la pause longue
btn_large.onclick = function(){
    if (mode != long_break) {
        timer.textContent = formatTime(long_break * 60) // Affiche 30:00 (par défaut)
        clearInterval(timerInterval); // Arrête tout minuteur en cours
    btn_start.textContent = "start"; // Change le texte du bouton en "Start"
    timeLeft = long_break * 60;
    isRunning = false;
    
    }
    mode = long_break;
    
}

// Quand le bouton des paramètres est cliqué, afficher la fenêtre modale
btn_settings.onclick = function() {
    modal.style.display = "block"; // Affiche la fenêtre modale
 
}

sub_btn.onclick = function(){
   
    pomodoro = pomodoro_input.value;
    short_break = short_break_input.value;
    long_break = long_break_input.value;

    clearInterval(timerInterval);
    btn_start.textContent = "start";

    mode =pomodoro;//se remettre en mode pomodoro par defaut
    
    timer.textContent = formatTime(pomodoro *60);
    
    modal.style.display = "none"; // Masque la fenêtre modale

    const selectedAura = aura_select.value;
    document.body.style.backgroundImage = `url('${selectedAura}')`;
    

   
 
    
   


 

 
}
// Afficher le pop-up GitHub après un délai
window.onload = function() {
    setTimeout(function() {
        const githubPopup = document.getElementById('github_popup');
        githubPopup.classList.add('show');
    }, 2000); // Délai de 2 secondes avant l'affichage
};

// Fermer le pop-up lorsqu'on clique sur le bouton de fermeture
document.querySelector('.close_popup').onclick = function() {
    const githubPopup = document.getElementById('github_popup');
    githubPopup.classList.remove('show');
};
aura_select.onchange = function () {
    const selectedOption = aura_select.options[aura_select.selectedIndex];
    const imageUrl = selectedOption.getAttribute("data-image");
    aura_preview.src = imageUrl;
};



// Fermer la fenêtre modale lorsque l'utilisateur clique sur le bouton de fermeture (span)
span.onclick = function() {
    modal.style.display = "none"; // Masque la fenêtre modale
}

// Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de la fenêtre modale
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Masque la fenêtre modale
    }
}

// Script pour le minuteur
let timerInterval; // Variable pour stocker l'intervalle du minuteur
const btn_start = document.getElementById("btn_start"); // Bouton pour démarrer le minuteur


// Quand le bouton de démarrage est cliqué, démarrer le minuteur ou le mettre en pause
btn_start.onclick = function() {
    if (!isRunning) {
        const duration = parseInt(mode); // Récupère la durée du segment Pomodoro en minutes
        

        clearInterval(timerInterval); // Arrête tout minuteur en cours

        if (!timeLeft) {
            timeLeft = duration * 60; // Convertit la durée en secondes si ce n'est pas défini
        }

        timer.textContent = formatTime(timeLeft); // Affiche la durée formatée (HH:MM:SS)
       
        // Démarre le minuteur avec un intervalle d'une seconde
        timerInterval = setInterval(() => {
            timeLeft--; // Décrémente le temps restant
            timer.textContent = formatTime(timeLeft); // Met à jour l'affichage du minuteur
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Arrête le minuteur quand le temps est écoulé
                isRunning = false;
                btn_start.textContent = "start"; // Change le texte du bouton en "Start"

            }
        }, 1000);

        btn_start.textContent = "pause"; // Change le texte du bouton en "Pause"
        isRunning = true; // Indique que le minuteur est en cours d'exécution
    } else {
        clearInterval(timerInterval); // Arrête le minuteur
        btn_start.textContent = "start"; // Change le texte du bouton en "Start"
        isRunning = false; // Indique que le minuteur est en pause
    }
}


btn_reset.onclick = function(){
    const duration = parseInt(mode); // Récupère la durée du segment Pomodoro en minutes
    timeLeft = duration * 60; // Réinitialise le temps restant
    clearInterval(timerInterval); // Arrête tout minuteur en cours
    timer.textContent = formatTime(timeLeft); // Met à jour l'affichage du minuteur
    isRunning = false; // Indique que le minuteur est arrêté
    btn_start.textContent = "Start"; // Change le texte du bouton en "Start"
}

// Fonction pour formater le temps en HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600); // Calcule les heures
    const minutes = Math.floor((seconds % 3600) / 60); // Calcule les minutes
    const secs = seconds % 60; // Calcule les secondes restantes
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Retourne le temps formaté
}




