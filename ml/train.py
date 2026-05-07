import torch
import torch.nn as nn
from pathlib import Path
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import Compose, RandomAffine, ToTensor

from model import DigitsNetwork

_HERE = Path(__file__).resolve().parent

device = (
    torch.accelerator.current_accelerator().type
    if torch.accelerator.is_available()
    else "cpu"
)
print(f"Device: {device}")

train_transform = Compose([
    RandomAffine(degrees=10, translate=(0.1, 0.1), scale=(0.9, 1.1)),
    ToTensor(),
])

training_data = datasets.MNIST(root=str(_HERE / "data"), download=True, train=True, transform=train_transform)
test_data = datasets.MNIST(root=str(_HERE / "data"), download=True, train=False, transform=ToTensor())

train_loader = DataLoader(training_data, batch_size=64, shuffle=True)
test_loader = DataLoader(test_data, batch_size=64)

model = DigitsNetwork().to(device)
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)


def train_epoch():
    model.train()
    for X, y in train_loader:
        X, y = X.to(device), y.to(device)
        loss = loss_fn(model(X), y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def accuracy():
    model.eval()
    correct = 0
    with torch.no_grad():
        for X, y in test_loader:
            X, y = X.to(device), y.to(device)
            correct += (model(X).argmax(1) == y).sum().item()
    return correct / len(test_data)


epochs = 20
for epoch in range(1, epochs + 1):
    train_epoch()
    acc = accuracy()
    print(f"Epoch {epoch:>2}/{epochs}  accuracy: {acc:.4f}")

torch.save(model.state_dict(), _HERE / "model.pth")
print(f"Saved {_HERE / 'model.pth'}")
