from .models import Admin, User

def get_user_role(nombre, password):
    try:
        admin_user = Admin.objects.get(nombre=nombre)
        if admin_user.password == password:
            print("Matched admin")
            return 'admin', admin_user.id  
    except Admin.DoesNotExist:
        pass
    
    try:
        app_user = User.objects.get(nombre=nombre)
        if app_user.password == password:
            print("Matched user")
            return 'user', app_user.id  
    except User.DoesNotExist:
        pass

    print("No match found")
    return None, None
