# Generated by Django 4.0.4 on 2022-04-28 00:12

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song_artist', models.CharField(max_length=255, unique=True)),
                ('song', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('genre', models.CharField(choices=[('Pop', 'Pop'), ('Hip-Hop', 'Hip-Hop'), ('Classic', 'Classic'), ('Rock', 'Rock'), ('Country', 'Country'), ('Indie', 'Indie'), ('EDM', 'EDM'), ('Jazz', 'Jazz'), ('RnB', 'RnB'), ('Other', 'Other')], max_length=60)),
                ('favorite', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song_artist', models.CharField(max_length=255)),
                ('song', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('rating', models.PositiveBigIntegerField(default=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]