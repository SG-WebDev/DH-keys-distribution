using serverDH.Services;
using System.Collections.Generic;

namespace serverDH.Interfaces
{
    public interface ISecretKey
    {
        public void AddUserList(string u, string p);
        public int LengthUserList();
        public void GetAllList();
        public void KeyExchange(int n);

    }
}
