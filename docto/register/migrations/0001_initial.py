
import register.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OtpToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('otp_code', models.CharField(default=register.models.generate_otp, max_length=6)),
                ('otp_expires_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('second_name', models.CharField(max_length=50)),
                ('clinic_id', models.IntegerField(unique=True)),
                ('phone_number', models.CharField(max_length=15, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
            ],
        ),
    ]
