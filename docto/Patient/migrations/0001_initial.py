
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
                ('specialization', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('RegistrationId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('PhoneNumber', models.IntegerField(null=True)),
                ('Email', models.EmailField(max_length=100)),
                ('Age', models.IntegerField(null=True)),
                ('Gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=100)),
                ('City', models.CharField(max_length=100)),
                ('RefferedBy', models.CharField(max_length=100, null=True)),
                ('Fee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('FeeType', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('Doctor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Patient.doctor')),
            ],
        ),
    ]
