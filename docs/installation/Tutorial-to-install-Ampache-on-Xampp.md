# Tutorial to install Ampache on Xampp

1. Download xampp
2. Install xampp
3. Download ampache ( normal or squash version )
4. unzip the ampache zip file, rename the resulting folder as ampache
5. Move the folder in htdocs xampp folder
6. Open php.ini in xampp and uncomment extension=intl
7. Open on a browser and write
http://localhost/ampache/public/install.php  ( normal version )
http://localhost/ampache/install.php  ( squash version )
8. Follow the installation
9. (IMPORTANT) Choose Create Database User ( last one option ) , choose a database username and a password
10. Your ampache address should be:
http://localhost/ampache/public/ ( normal version )
http://localhost/ampache/  ( squash version )

# Troubleshooting:

If a database username doesn't work, the database user is already present.
Now you have two options:

a. Choose another username

b. Go to phpmyadmin and write in SQL: DROP USER username@localhost;

If you want to reinstall ampache simply delete ampache.cfg.php in ampache/config folder and repeat the process, you have to choose the *Overwrite if Database Already Exists* option and another database username if you haven't deleted the previous one.
