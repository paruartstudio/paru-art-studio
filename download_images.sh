#!/usr/bin/env bash
# Download 4 images per category from Unsplash Source (random images by query).
set -e
mkdir -p images/bridal images/hair images/special-occasion images/magazine images/portraits
echo "Downloading Bridal images..."
curl -L -o images/bridal/bridal-1.jpg https://source.unsplash.com/1600x1067/?bridal,wedding
curl -L -o images/bridal/bridal-2.jpg https://source.unsplash.com/1600x1067/?bride,makeup
curl -L -o images/bridal/bridal-3.jpg https://source.unsplash.com/1600x1067/?indian%20bride,bridal
curl -L -o images/bridal/bridal-4.jpg https://source.unsplash.com/1600x1067/?wedding%20makeup,bridal
echo "Downloading Hair images..."
curl -L -o images/hair/hair-1.jpg https://source.unsplash.com/1600x1067/?hairstyle,updo
curl -L -o images/hair/hair-2.jpg https://source.unsplash.com/1600x1067/?bridal%20hair,hairstyle
curl -L -o images/hair/hair-3.jpg https://source.unsplash.com/1600x1067/?hair,styling
curl -L -o images/hair/hair-4.jpg https://source.unsplash.com/1600x1067/?hair%20updo,wedding
echo "Downloading Special Occasion images..."
curl -L -o images/special-occasion/special-1.jpg https://source.unsplash.com/1600x1067/?party%20makeup,event%20makeup
curl -L -o images/special-occasion/special-2.jpg https://source.unsplash.com/1600x1067/?prom%20makeup,glamour
curl -L -o images/special-occasion/special-3.jpg https://source.unsplash.com/1600x1067/?evening%20makeup,glam
curl -L -o images/special-occasion/special-4.jpg https://source.unsplash.com/1600x1067/?occasion%20makeup,beauty
echo "Downloading Magazine images..."
curl -L -o images/magazine/mag-1.jpg https://source.unsplash.com/1600x1067/?editorial%20makeup,photoshoot
curl -L -o images/magazine/mag-2.jpg https://source.unsplash.com/1600x1067/?fashion%20makeup,editorial
curl -L -o images/magazine/mag-3.jpg https://source.unsplash.com/1600x1067/?model%20photoshoot,beauty
curl -L -o images/magazine/mag-4.jpg https://source.unsplash.com/1600x1067/?studio%20portrait,editorial
echo "Downloading Portraits images..."
curl -L -o images/portraits/portrait-1.jpg https://source.unsplash.com/1600x1067/?portrait,women
curl -L -o images/portraits/portrait-2.jpg https://source.unsplash.com/1600x1067/?portrait%20photography,female
curl -L -o images/portraits/portrait-3.jpg https://source.unsplash.com/1600x1067/?fine%20art%20portrait,woman
curl -L -o images/portraits/portrait-4.jpg https://source.unsplash.com/1600x1067/?beauty%20portrait,female
echo "Done."
