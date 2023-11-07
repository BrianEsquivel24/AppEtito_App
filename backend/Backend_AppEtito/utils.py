from .models import Admin, User

def get_user_role(nombre, password):
    try:
        admin_user = Admin.objects.get(nombre=nombre)
        if admin_user.password == password:  # Comprobación en texto plano
            print("Matched admin")  # Debugging line
            return 'admin', admin_user
    except Admin.DoesNotExist:
        pass
    
    try:
        app_user = User.objects.get(nombre=nombre)
        if app_user.password == password:  # Comprobación en texto plano
            print("Matched user")  # Debugging line
            return 'user', app_user
    except User.DoesNotExist:
        pass

    print("No match found")  # Debugging line
    return None, None
