# CrastShare backend

## How to run 

<p><code>docker-compose build</code></p>
<code>docker-compose up -d</code>
<p><code>docker-compose run backend python manage.py makemigrations</code></p>
<p><code>docker-compose run backend python manage.py migrate</code></p>
<p><code>docker-compose run backend python manage.py createsuperuser</code></p>

### Main urls for test
<p><code>http://127.0.0.1/admin</code> вход по тому логину который создавали как супер юзер</p>
<p><code>http://127.0.0.1/api/v1/auth/ </code></p>
<p><code>http://127.0.0.1/api/v1/userprofiles/ </code></p>
<p><code>http://127.0.0.1/api/v1/userprofile/your_username </code></p>
<p><code>http://127.0.0.1/api/v1/posts/ </code></p>

