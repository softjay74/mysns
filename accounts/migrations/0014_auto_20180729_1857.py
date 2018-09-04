# Generated by Django 2.0.7 on 2018-07-30 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_auto_20180729_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='followers',
            field=models.ManyToManyField(blank=True, related_name='_userprofile_followers_+', to='accounts.UserProfile'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='following',
            field=models.ManyToManyField(blank=True, related_name='_userprofile_following_+', to='accounts.UserProfile'),
        ),
    ]