# Generated by Django 4.2.6 on 2023-10-24 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Backend_AppEtito', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=20)),
                ('photo', models.ImageField(upload_to='photos/')),
            ],
        ),
    ]
